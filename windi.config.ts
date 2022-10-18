import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'
import { DeepNestObject } from 'windicss/types/interfaces'
import { Utilities } from './src/styles/windi/utilities'

export default defineConfig({
  attributify: true,
  theme: {
    extend: {
      colors: {
        primary: 'blue',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(Utilities as DeepNestObject)
    }),
  ],
})