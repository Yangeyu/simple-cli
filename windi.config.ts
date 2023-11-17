import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'
import { DeepNestObject } from 'windicss/types/interfaces'
import { Utilities } from './src/styles/windi/utilities'
import lineClamp from 'windicss/plugin/line-clamp'

export default defineConfig({
  attributify: true,
  theme: {
    extend: {
      colors: {
        primary: 'blue',
      },
      lineClamp: {
        sm: '2',
        lg: '10'
      }
    },
  },
  plugins: [
    lineClamp,
    plugin(({ addUtilities }) => {
      addUtilities(Utilities as DeepNestObject)
    }),
  ],
})
