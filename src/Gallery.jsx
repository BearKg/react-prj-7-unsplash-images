import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'

const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`

const Gallery = () => {
  const { searchValue, setSearchValue } = useGlobalContext()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['images', searchValue], // là một mảng tập hợp các giá trị để cấu thành 1 key. Với chỉ 1 key 'images' thì searchValue có thay đổi state value cũng ko thay đổi giá trị của data vì giá trị trước đó đã lưu vào images rồi
    queryFn: async () => {
      const { data } = await axios.get(`${url}&query=${searchValue}`)
      return data
    },
  })
 
  if (isLoading)
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    )
  if (isError)
    return (
      <section className="image-container">
        <h4>{error.message}</h4>
      </section>
    )
  if (data.length === 0)
    return (
      <section className="image-container">
        <h4>No Results Found...</h4>
      </section>
    )

  return (
    <section className="image-container">
      {data.results.map((item) => {
        const url = item.urls.regular
        return (
          <img
            className="img"
            src={url}
            key={item.id}
            alt={item.alt_description}
          ></img>
        )
      })}
    </section>
  )
}

export default Gallery
