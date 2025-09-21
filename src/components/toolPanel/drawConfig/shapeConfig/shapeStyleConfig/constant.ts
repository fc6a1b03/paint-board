import { ShapeStyle } from '@/constants/shape'

import {
  Square,
  Circle,
  Triangle,
  ArrowDownUp,
  ArrowBigLeft,
  Cloud,
  MessageSquare,
  Zap,
  X,
  Check,
  Info,
  Delete,
  Volume,
  Search,
  Heart,
  Bell
} from 'lucide-react'
import LineIcon from '@/components/icons/shapeStyle/line.svg?react'
import EllipseIcon from '@/components/icons/shapeStyle/ellipse.svg?react'
import BlockIcon from '@/components/icons/shapeStyle/block.svg?react'
import InfoOutlineIcon from '@/components/icons/shapeStyle/infoOutline.svg?react'

interface ShapeStyleSwitchType {
  type: string
  icon: React.ComponentType<any>
}

export const shapeStyleSwitch: Record<string, Array<ShapeStyleSwitchType>> = {
  line_1: [
    {
      type: ShapeStyle.Line,
      icon: LineIcon
    },
    {
      type: ShapeStyle.Rect,
      icon: Square
    },
    {
      type: ShapeStyle.Circle,
      icon: Circle
    },
    {
      type: ShapeStyle.Ellipse,
      icon: EllipseIcon
    },
    {
      type: ShapeStyle.Triangle,
      icon: Triangle
    }
  ],
  line_2: [
    {
      type: ShapeStyle.ArrowLine,
      icon: ArrowDownUp
    },
    {
      type: ShapeStyle.ArrowOutline,
      icon: ArrowBigLeft
    },
    {
      type: ShapeStyle.Cloud,
      icon: Cloud
    },
    {
      type: ShapeStyle.Tooltips,
      icon: MessageSquare
    },
    {
      type: ShapeStyle.Lightning,
      icon: Zap
    }
  ],
  line_3: [
    {
      type: ShapeStyle.Close,
      icon: X
    },
    {
      type: ShapeStyle.Check,
      icon: Check
    },
    {
      type: ShapeStyle.Info,
      icon: Info
    },
    {
      type: ShapeStyle.Backspace,
      icon: Delete
    },
    {
      type: ShapeStyle.Block,
      icon: BlockIcon
    }
  ],
  line_4: [
    {
      type: ShapeStyle.Speaker,
      icon: Volume
    },
    {
      type: ShapeStyle.Search,
      icon: Search
    },
    {
      type: ShapeStyle.InfoOutline,
      icon: InfoOutlineIcon
    },
    {
      type: ShapeStyle.Heart,
      icon: Heart
    },
    {
      type: ShapeStyle.Alert,
      icon: Bell
    }
  ]
}
