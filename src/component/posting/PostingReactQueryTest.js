import React from 'react'
import { useQuery } from 'react-query'
import { instanceAxios } from '../../dataManager/apiConfig'

const PostingReactQueryTest = () => {

    const { data, error, isLoading} = useQuery('getAudios',()=>{
      instanceAxios.get('/post/15/music')
    })
    console.log('data',data)
  return (
    <div>
      
    </div>
  )
}

export default PostingReactQueryTest
