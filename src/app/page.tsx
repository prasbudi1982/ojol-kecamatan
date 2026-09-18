"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({data})=> setUser(data.session?.user))
    supabase.auth.onAuthStateChange(async (_e, session) => {
      setUser(session?.user)
      if(session?.user){
        // auto bikin profile
        await supabase.from('profiles').upsert({
          id: session.user.id,
          email: session.user.email,
          nama: session.user.user_metadata.full_name,
          foto_url: session.user.user_metadata.avatar_url
        })
      }
    })
  }, [])

  const login = () => supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin }
  })
  const logout = () => supabase.auth.signOut().then(()=>setUser(null))

  if(!user) return (
    <div className="flex h-screen items-center justify-center flex-col gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold">Ojol Kecamatan</h1>
      <p>Versi warga, tanpa potongan.</p>
      <button onClick={login} className="bg-black text-white px-6 py-3 rounded-xl w-full">Login dengan Google</button>
    </div>
  )

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Halo, {user.user_metadata.full_name}</h1>
      <p className="text-sm">{user.email}</p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="border p-6 rounded-xl">Saya Penumpang</button>
        <button className="border p-6 rounded-xl">Saya Driver</button>
      </div>
      <button onClick={logout} className="mt-10 text-sm underline">Logout</button>
    </div>
  )
      }
