import { Cat as CatType } from '@/types/Cat';
import Image from 'next/image';
import { catAdd, catRemove, selectors as likeSelectors } from '@/slices/likeCatsSlice';
import { selectors } from '@/slices/catsSlice';
import { useAppDispatch, useAppSelector } from '@/utilities/hooks';

type CatProps = {
  cat: CatType;
};

const Cat = ({ cat }: CatProps) => {
  const dispatch = useAppDispatch();
  const cats = useAppSelector(selectors.selectAll);
  const myCats = useAppSelector(likeSelectors.selectAll);

  return (
    <div
      className="card"
      role="presentation"
      onKeyDown={() => {}}
      onClick={({ target }) => {
        const { id, previousElementSibling } = (target as HTMLDivElement);
        if (!id && previousElementSibling) {
          const isLike = myCats.find((myCat) => myCat.id === previousElementSibling.id);
          if (isLike) {
            dispatch(catRemove(previousElementSibling.id));
          } else {
            const candidate = cats.find((storeCat) => storeCat.id === previousElementSibling.id);
            if (candidate) {
              dispatch(catAdd(candidate));
            }
          }
        }
      }}
    >
      <Image
        src={cat.url}
        alt={cat.id}
        id={cat.id}
        fill
        placeholder="blur"
        style={{ objectFit: 'contain' }}
        sizes="max-width: 100%"
        loading="lazy"
        blurDataURL={process.env.NEXT_PUBLIC_SKELETON}
      />
      <span className={myCats.find((likeCat) => likeCat.id === cat.id) ? 'like animate__heartBeat' : ''} />
    </div>
  );
};

export default Cat;
