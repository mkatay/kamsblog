import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { readCategories } from '../utility/crudUtility'


export const CategContext=createContext()

export const CategProvider = ({children}) => {
    const [categories,setCategories]=useState(null)
    useEffect(()=>{
        const unsubscribe=readCategories(setCategories)
        return ()=>unsubscribe()
    },[])

  return (
    <CategContext.Provider value={{categories}}>
        {children}
    </CategContext.Provider>
  )
}
