import { createSignal, onCleanup, onMount } from 'solid-js'
import clsx from 'clsx'
import ExpandButton from '../expand-button'
import Logo from '../logo'

const SCROLL_PERCENT = 1.5

function getScrollPercentage() {
  // 获取当前滚动的位置
  const scrollTop = window.scrollY
  // 计算整个文档的高度减去视口的高度，得到总的可滚动高度
  const scrollHeight
    = document.documentElement.scrollHeight
    - document.documentElement.clientHeight
  // 计算滚动的百分比
  return (scrollTop / scrollHeight) * 100
}

function Nav() {
  const [transparent, setTransparent] = createSignal(true)

  onMount(() => {
    const scrollEvent = () => {
      if (getScrollPercentage() > SCROLL_PERCENT) {
        setTransparent(false)
      }
      else {
        setTransparent(true)
      }
    }
    scrollEvent()
    window.addEventListener('scroll', scrollEvent)
    onCleanup(() => {
      window.removeEventListener('scroll', scrollEvent)
    })
  })

  return (
    <nav
      class={clsx(
        'w-full h-72px fixed top-0 z-40 w-full py-4 transition-colors py-4',
        transparent()
          ? 'text-[hsl(var(--muted-foreground))] bg-transparent'
          : 'backdrop-blur-md text-[hsl(var(--foreground))] bg-[hsl(var(--background)/.75)]',
      )}
    >
      <div class="h-full flex items-center justify-between gap-4 px-8">
        <a
          class={clsx(
            transparent()
              ? 'text-[hsl(var(--muted-foreground))]'
              : 'text-[var(--main-color)]',
          )}
          href="/"
        >
          <Logo />
        </a>

        <div class="flex items-center font-sans">
          <div class="flex gap-4 <md:hidden">
            <a class="nav-link font-700" href="/" data-astro-prefetch>
              光伏的探寻
            </a>
            <a class="nav-link font-700" href="/solution" data-astro-prefetch>
              工商业解决方案
            </a>
            <a class="nav-link font-700" href="/family" data-astro-prefetch>
              家庭智能解决方案
            </a>
            <a class="nav-link font-700" href="/about" data-astro-prefetch>
              关于volt+
            </a>
            <a class="nav-link font-700" href="/contact" data-astro-prefetch>
              联系我们
            </a>
          </div>
          <div class="md:hidden inline-flex items-center justify-center rounded-full text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:bg-accent hover:text-accent-foreground h-10 w-10">
            <ExpandButton
              onChange={(flag) => {
                console.log(flag)
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
