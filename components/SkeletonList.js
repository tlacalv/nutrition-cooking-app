import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "../styles/sass/components/skeletoncard.module.scss";

export default function SkeletonList(props) {
  return (
    <>
      {Array(props.elements)
        .fill()
        .map((item, index) => {
          return (
            <SkeletonTheme highlightColor="#d9d9d9">
            <div className={styles.card}>
              <h2 className="md-26">
                <Skeleton duration={1} />
              </h2>
              <div className={styles.information}>
                <Skeleton height={113} width={60} />
                <Skeleton height={113} width={60} />
                <Skeleton height={113} width={60} />
                <Skeleton height={113} width={60} />
              </div>
              <div className={styles.buttons}>
                <Skeleton circle height={40} width={40} />
                <Skeleton circle height={40} width={40} />
              </div>
            </div>
            </SkeletonTheme>
          );
        })}
    </>
  );
}
