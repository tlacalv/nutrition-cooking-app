import styles from '../styles/sass/components/button.module.scss';
import {classList} from '../functions'

export default function Button(props) {
  const {loading} = props;
  const classes = classList({
    [styles.btn]: true,
    [styles.primary]: true,
    [styles.disabled]: loading

  })

  function createRipple(event){
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`
    circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`
    circle.classList.add('ripple')

    const ripple = button.getElementsByClassName('ripple')[0]
    if(ripple) {
      ripple.remove()
    } 
    button.appendChild(circle);
  }
  return (
    <>
    <button disabled={loading} onClick={(e)=>{createRipple(e);props.onClick?.()}} className={classes}>
      {props.children}
    </button>
    </>
  )
}
