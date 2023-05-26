import axios from 'axios'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

/* ****************** 模拟请求响应 *********************/
const mockRsp = { msg: 'ok' }
const restHandlers = [
  rest.post('http://yangwb/req', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockRsp))
  }),
]

const server = setupServer(...restHandlers)

/* ****************** 设置全局变量 *********************/
vi.mock('../cancel.ts', async importOriginal => {
  const actual = await importOriginal() as any
  const c = actual.HttpCanceler
  const removePending = c.removePending
  vi.spyOn(c, 'removePending').mockImplementation((config: any) => {
    // const key = c.genPendingKey(config)
    // console.log(key);
    removePending.apply(c, [config])
  })
  return {
    HttpCanceler: c,
  }
})

const conf = {
  axios: {
    timeout: 10000,
    successCode: [0, 200],
  },
  baseApiUrl: '',
}
const msg = {
  error() { return },
}

vi.stubGlobal('$config', conf)
vi.stubGlobal('$message', msg)

beforeAll(() => { server.listen({ onUnhandledRequest: 'error' }) })
afterAll(() => { server.close() })
afterEach(() => server.resetHandlers())

/* ******************  编写单元测试  *********************/
describe('Check extraOptions: isEnableCancelToken', async () => {
  const { http } = await import('../index')

  it('Check if the first request has been cancelled', async () => {
    const p1 = http.post({ url: 'http://yangwb/req' }).catch(err => axios.isCancel(err))
    const p2 = http.post({ url: 'http://yangwb/req' })
    const rsp1 = await p1
    const rsp2 = await p2
    expect(rsp1).toEqual(true)
    expect(rsp2).toEqual(mockRsp)
  })

  it('Check that both requests have completed successfully', async () => {
    const p1 = http.post({ url: 'http://yangwb/req' }, { isEnableCancelToken: false })
    const p2 = http.post({ url: 'http://yangwb/req' }, { isEnableCancelToken: false })
    const rsp1 = await p1
    const rsp2 = await p2
    expect(rsp1).toEqual(mockRsp)
    expect(rsp2).toEqual(mockRsp)
  })
})

describe('Check extraOptions: isHandleResponseResult', async () => {
  const { http } = await import('../index')
  const extraOptions = {
    isHandleResponseResult: false,
  }

  it('Check if the response body contains the raw config object', async () => {
    const p1 = http.post({ url: 'http://yangwb/req' }, extraOptions)
    const rsp1 = await p1
    expect(rsp1.config).toBeTruthy()
  })
})

