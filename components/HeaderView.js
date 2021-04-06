import React from 'react'
import styles from '../styles/sass/components/headerview.module.scss';
import BackButton from './BackButton';
import {classList} from '../functions'
const classesTitle = classList({
  'rg-26': true,
  [styles.title]: true
})
const classesSubtitle = classList({
  'rg-20': true,
  [styles.subtitle]: true
})
export default function HeaderView() {

  return (
    <div className={styles.header}>
      <BackButton />
      <h1 className={classesTitle}>Recipes</h1>
      <h3 className={classesSubtitle}>Add</h3>
    </div>
  )
}
