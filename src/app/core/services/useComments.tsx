import axios from 'axios';

const apiUrl = 'http://localhost:4000/api/comments';

export const createComment = async (comment: any) => axios.post(apiUrl, comment);

export const getCommentsByArtist = async (artistId: number, userId: string) =>
  axios.get<any[]>(`${apiUrl}?artistId=${artistId}&userId=${userId}`);

export const updateComment = async (id: string, comment: any) =>
  axios.put(`${apiUrl}/${id}`, comment);

export const deleteComment = async (id: string) =>
  axios.delete(`${apiUrl}/${id}`);
