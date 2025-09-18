import { FC, MouseEventHandler } from "react"
import styles from './styles.module.css'

type AnimatedMenuIcon = {
  isOpen?: boolean
  onClick?: MouseEventHandler
  className?: string
}

const AnimatedMenuIcon: FC<AnimatedMenuIcon> = ({ isOpen, onClick, className }) => {
  return (
    <div role='button' onClick={onClick} className={`${styles.icon} ${isOpen ? styles.open : styles.closed} ${className}`}>
      <span className={styles.one}></span>
      <span className={styles.two}></span>
      <span className={styles.three}></span>
    </div>
  )
}

export default AnimatedMenuIcon
