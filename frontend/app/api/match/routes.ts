import io from 'socket.io-client';
const socket = io('http://localhost:8081');

const BASE_URL = 'http://localhost:8081/match'

export interface PAIR {
  roomId: string,
  username1: string,
  username2: string,
  complexity: string
  questionId: string,
}

async function fetchData(api: string, requestOptions = {}): Promise<any> {
  const response = await fetch(api, requestOptions)
  const results = await response.json()
  if (!response.ok) {
    throw new Error(results.error)
  }
  return results.res
}

export async function fetchPairByRoom(roomId: string | string[]): Promise<PAIR> {
  const fetchPairApi = `${BASE_URL}/getByRoom/${roomId}`
  return fetchData(fetchPairApi)
}

export async function deletePair(roomId: string| string[]): Promise<void> {
  console.log("delete pair called in routes")
  const deletePairApi = `${BASE_URL}/deletePair/${roomId}`
  const requestOptions = {
    method: "DELETE"
  };
  const response = await fetch(deletePairApi, requestOptions)
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error)
  }
}

export async function fetchPair(username: string): Promise<PAIR> {
  const fetchPairApi = `${BASE_URL}/getPair/${username}`
  return fetchData(fetchPairApi)
}

export async function fetchAllPairs(): Promise<PAIR[]> {
  return fetchData(`${BASE_URL}/pair}`)
}

export async function fetchRoomId(username: string): Promise<String> {
  return fetchData(`${BASE_URL}/getRoomId/${username}`)
}

export async function putQuestionByRoomId(roomId: string | string[], questionId: string): Promise<PAIR> {
  const putQuestionApi = `${BASE_URL}/editByRoom/${roomId}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roomId, questionId }),
  };
  return fetchData(putQuestionApi, requestOptions);
}

export async function fetchQuestionByRoomId(roomId: string | string[]): Promise<String> {
  return fetchData(`${BASE_URL}/getQuestionId/${roomId}`)
}

export const findMatch = (username: string, complexity: string) => {
  const data = {username, complexity};
  socket.emit('find-match', data);
};

export const cancelMatch = (username:string) => {
  socket.emit('cancel-match', {username});
};

export const joinRoom = (roomId: string) => {
  socket.emit('join-room', { roomId });
};

