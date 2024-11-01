export type Response = {
  code: number
  msg: string
  data: Array<any>
  request_id:string
}

type data =  {
  list:Array<any>
  total:number
}
export type ResponseList = {
  code: number
  msg: string
  data: data
  request_id:string
}

export type MenuResponseList = {
  code: number
  msg: string
  data: any[]
  request_id:string
}
