const BASE_URL = 'http://localhost:8000/history'

interface HISTORY {
    roomId: '',
    username:'',
    attemptedDate: Date,
    questionId: ''
}

async function fetchData(api: string, requestOptions = {}): Promise<any> {
    const response = await fetch(api, requestOptions)
    const results = await response.json()
    /* if (!response.ok) {
      throw new Error(results.error)
    } */
    return results.res
}

export async function addHistory(roomId: string | string[], username: string, questionId: string): Promise<HISTORY> {
    const addHistoryApi = `${BASE_URL}/add`
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId, username, questionId }),
      };
      return fetchData(addHistoryApi, requestOptions);
}

export async function fetchHistoryByUsername(username: string): Promise<HISTORY[]> {
    return fetchData(`${BASE_URL}/byUser/${username}`)
}

export async function fetchHistoryByQuestion(questionId: string): Promise<HISTORY[]> {
    return fetchData(`${BASE_URL}/byQuestionId/${questionId}`)
}

export async function fetchHistoryByRoom(roomId: string): Promise<HISTORY[]> {
    return fetchData(`${BASE_URL}/byRoomId/${roomId}`)
}