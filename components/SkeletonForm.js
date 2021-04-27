import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "../styles/sass/components/skeleton.module.scss";

export default function SkeletonList(props) {
  return (
    <SkeletonTheme color="#ebebeb" highlightColor="#d9d9d9">
      <div class={styles.skeleton_form}>
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </div>
    </SkeletonTheme>
  );
}
