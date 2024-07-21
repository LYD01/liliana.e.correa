import Image from 'next/image';

export const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: any, setSearchQuery: any }) => {
    return (
        <div className='relative z-0'>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                //   style={{ padding: '10px', width: '100%', marginBottom: '20px', boxSizing: 'border-box' }}
                className='p-4 h-1 rounded my-4 text-black'
            />
            <Image
                src={`/icons/search_24dp_FILL0_wght400_GRAD0_opsz24.svg`}
                alt="search button" width={30} height={30}
                className="h-full w-[2.5rem] absolute top-0 left-[210px] "
            />
        </div>
  );
};

