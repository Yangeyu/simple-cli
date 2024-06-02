import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({ /* preset options */ }),
    presetUno(),
  ],
  rules: [
    ['m-aa-1', { margin: '0.25rem' }],
  ],
  shortcuts: [
    ['f-cc', 'flex items-center justify-center'],
    ['fc-cc', 'flex flex-col items-center justify-center']
  ]
})
