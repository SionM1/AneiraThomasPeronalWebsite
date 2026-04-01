'use client'

import type { ComponentType } from 'react'
import { makePage } from '@keystatic/next/ui/app'
import config from '../../../keystatic.config'

export default makePage(config) as ComponentType<Record<string, never>>
