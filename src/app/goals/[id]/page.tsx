import { useRouter } from 'next/navigation';
const Page = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
          <h1>Page ID: {id}</h1>
        </div>
      );
}

export default Page;