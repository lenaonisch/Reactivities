import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, item: IActivity) => axios.post(url, item).then(responseBody),
    put: (url: string, item: IActivity) => axios.put(url, item).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Activities = {
    list: () : Promise<IActivity[]> => requests.get('/activities'),
    add: (item: IActivity) => requests.post('/activities', item),
    edit: (item: IActivity) => requests.put('/activities', item),
    delete: (id: string) => requests.delete('/activities/'+ id)
}

export default {
    Activities
}