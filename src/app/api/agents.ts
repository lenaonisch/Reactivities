import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms)
    ) ;

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, item: IActivity) => axios.post(url, item).then(sleep(1000)).then(responseBody),
    put: (url: string, item: IActivity) => axios.put(url, item).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}

const Activities = {
    list: () : Promise<IActivity[]> => requests.get('/activities'),
    get: (id: string) : Promise<IActivity> => requests.get('/activities/'+ id),
    add: (item: IActivity) => requests.post('/activities', item),
    edit: (item: IActivity) => requests.put('/activities', item),
    delete: (id: string) => requests.delete('/activities/'+ id)
}

const Categories = {
    list: () : Promise<string[]> => requests.get('/categories')
}

export default {
    Activities,
    Categories
}