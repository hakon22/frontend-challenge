import { selectors } from '@/slices/likeCatsSlice';
import { useAppSelector } from '@/utilities/hooks';
import Helmet from '@/components/Helmet';
import Cat from '@/components/Cat';
import type { Cat as CatType } from '@/types/Cat';

const My = () => {
  const myCats = useAppSelector(selectors.selectAll);

  return (
    <>
      <Helmet title="Любимые котики" description="Избранное" />
      <div className="cats">
        {myCats.map((cat: CatType) => <Cat key={cat.id} cat={cat} />)}
      </div>
    </>
  );
};

export default My;
