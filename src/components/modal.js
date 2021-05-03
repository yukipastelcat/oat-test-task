import {
  h
} from 'snabbdom'
import Component from '../core/component'

export default class ModalComponent extends Component {
  constructor (
    props = {
      onClose: () => {}
    },
    slots = {
      default: () => null
    }
  ) {
    super(props, slots)
  }

  render () {
    return h(
      'div.fixed.top-0.left-0.w-full.h-full.bg-black.bg-opacity-30.flex.flex-col.justify-center',
      {
        on: {
          click: this.props.onClose
        }
      },
      h(
        'div.container.mx-auto.bg-white.rounded-lg.p-5.max-w-3xl',
        {
          on: {
            click: (evt) => {
              evt.stopPropagation()
            }
          }
        },
        [
          h(
            'div.pb-5',
            this.slots.default()
          ),
          h(
            'div.flex.justify-end.border-t-2.pt-5',
            h(
              'button.bg-blue-500.text-white.p-3.rounded-md',
              {
                on: {
                  click: this.props.onClose
                }
              },
              'Close'
            )
          )
        ]
      )
    )
  }
}
