import styles from '../styles/sass/components/buttonadd.module.scss';
import {classList} from '../functions'

export default function ButtonAdd(props) {
  const {loading} = props;
  const classes = classList({
    [styles.btn]: true,
    [styles.primary]: true,
    [styles.disabled]: loading,
    [props.className]: true,

  })

  function createRipple(event){
    const button = event.currentTarget;
    const {top, left} =button.getBoundingClientRect()

    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - (left + radius)}px`
    circle.style.top = `${event.clientY - (top + radius)}px`
    circle.classList.add('ripple')

    const ripple = button.getElementsByClassName('ripple')[0]
    if(ripple) {
      ripple.remove()
    } 
    button.appendChild(circle);
  }
  return (
    <>
    
    <button disabled={loading} onClick={(e)=>{createRipple(e);props.onClick?.()}} type={props.type?props.type:'submit'} className={classes}>
      {props.children}
    </button>
    </>
  )
}
