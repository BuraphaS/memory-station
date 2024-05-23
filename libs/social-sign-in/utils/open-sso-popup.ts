export function openSSOPopup (url: string): Window | null {
  const ssoUrl = url

  const width = 600
  const height = 600
  const left = window.innerWidth / 2 - width / 2
  const top = window.innerHeight / 2 - height / 2

  return window.open(ssoUrl, '_blank', `width=${ width },height=${ height },left=${ left },top=${ top}`)
}
