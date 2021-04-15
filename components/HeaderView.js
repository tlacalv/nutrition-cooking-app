import React from 'react'
import styles from '../styles/sass/components/headerview.module.scss';
import BackButton from './BackButton';
import {classList} from '../functions'

export default function HeaderView(props) {
  const {secondary} = props;

  const classesTitle = classList({
    'rg-26': true,
    [styles.title]: true,
    [styles.title_secondary]: secondary
  })
  const classesHeader = classList({
    [styles.header]: true,
    [styles.header_secondary]: secondary
  })
  const classesSubtitle = classList({
    'rg-20': true,
    [styles.subtitle]: true,
    [styles.subtitle_secondary]: secondary
  })
  return (
    <div className={classesHeader}>
      <BackButton />
      <h1 className={classesTitle}>{props.title}</h1>
      <h3 className={classesSubtitle}>{props.subtitle}</h3>
    </div>
  )
}
