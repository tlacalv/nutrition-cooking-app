import React from "react";
import styles from "../styles/sass/components/skeletoncard.module.scss";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'

export default function SkeletonInfo() {
  return (
    
    <div className={styles.information}>
      <Skeleton height={120} width={70} />
      <Skeleton height={120} width={70} />
      <Skeleton height={120} width={70} />
      <Skeleton height={120} width={70} />
    </div>
  );
}
