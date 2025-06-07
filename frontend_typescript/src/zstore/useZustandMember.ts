import {create} from "zustand/react";
import {loginPost} from "../api/memberApi.tsx";
import {removeCookie, setCookie} from "../util/cookieUtil.ts";

export interface MemberInfo {
  email: string,
  nickname: string,
  accessToken: string,
  refreshToken: string,
  roleNames: string[]
}

export interface MemberStore {
  member: MemberInfo;
  status: '' | 'pending' | 'fulfilled' | 'error';
  login: (email: string, pw:string) => void;
  logout: () => void;
  save: (memberInfo: MemberInfo) => void
}

const initState: MemberInfo = {
  email: '',
  nickname: '',
  accessToken: '',
  refreshToken: '',
  roleNames: []
}

export const useZustandMember = create<MemberStore>( (set) => {

  return {
    member: initState,
    status: '',
    login: async (email: string, pw:string) => {

      set({ status: 'pending' })

      try {
        const data = await loginPost(email, pw)

        set({ member: {...data }, status: 'fulfilled' })

        const newState = {...data, status: 'fulfilled' }

        setCookie("member", JSON.stringify(newState), 1) // 1일

      } catch (err) {
        console.error("Login failed", err)
        set({ status: 'error' })
      }


    },
    logout: () => {
      set({ member: initState, status: '' })
      removeCookie("member")
    },
    save: async (memberInfo: MemberInfo) => {
      set({ member: memberInfo, status: 'fulfilled' })
    },
  }
})