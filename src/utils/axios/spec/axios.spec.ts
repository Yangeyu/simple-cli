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


/* ******************  编写单元测试  *********************/
describe('Simulate launching two requests at the same time', async () => {
  beforeEach(() => server.listen({ onUnhandledRequest: 'error' }))
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
    const p1 = http.post({ url: 'http://yangwb/req' })
    const p2 = http.post({ url: 'http://yangwb/req' }, { isIgnoreCancelToken: false })
    const rsp1 = await p1
    const rsp2 = await p2
    expect(rsp1).toEqual(mockRsp)
    expect(rsp2).toEqual(mockRsp)
  })
  afterAll(() => server.close())
})
