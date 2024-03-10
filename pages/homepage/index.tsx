import { Dropdown, MenuProps } from 'antd';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import Button from '../../components/atoms/Button';
import {
    GearIcon,
    HomeIcon,
    SearchIcon,
    XIcon,
    ImageIcon,
    GifIcon,
    AccountIcon,
    ChatIcon,
    LoveIcon,
    PollIcon,
    RetweetIcon,
    SaveIcon,
    ShareIcon,
    StatsIcon,
    ThreePoint,
    BellIcon,
    MessageIcon
} from '../../components/atoms/Icons';
import './styles.css';
import AuthContext from '../../context/AuthContext';
import { createPost, deletePostById, getAllPost } from '../../services/guarded/post';
import ComposeIcon from '../../components/atoms/Icons/ComposeIcon';

type tabType = 'for-you' | 'following';

interface contentInt {
    id: number;
    username: string;
    fullName: string;
    textContent: string;
    userId: number;
    formattedUpdatedAtDifference: string;
}

const Home = () => {
    const [activeTab, setActiveTab] = useState<tabType>('for-you')
    const [activeMenu, setActiveMenu] = useState(0);
    const { setIsLoggedInCtx } = useContext(AuthContext)

    return (
        <div className="container mx-auto lg:px-16">
            {activeMenu === 0 ?
                <>
                    {/* top and side navigation for desktop and tablet */}
                    <div className='hidden sm:block sticky top-0'>
                        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                    {/* top navigation for mobile */}
                    <div className="flex-1 overflow-y-auto sm:hidden">
                        <div className="sticky top-0 bg-white">
                            <div className="flex flex-row px-8 items-center justify-between py-4">
                                <img className="w-10 h-10 rounded-full" src="https://pbs.twimg.com/profile_images/1547743320780455936/VfK1dCFG_400x400.jpg" alt="" />
                                <XIcon className={'h-6 w-6'} />
                                <div onClick={() => { setIsLoggedInCtx(false); localStorage.removeItem('accessToken'); }}>
                                    <GearIcon className={'h-6 w-6'} />
                                </div>
                            </div>
                            <div className="flex flex-row px-8 border-b-gray-400 border-b-[0.5px] justify-around">
                                <div className="text-center" onClick={() => setActiveTab('for-you')}>
                                    <p className={`font-bold ${activeTab === 'for-you' ? "border-b-blue-400" : "border-transparent"} border-b-[3px] pb-2`}>For you</p>
                                </div>
                                <div className="text-center" onClick={() => setActiveTab('following')}>
                                    <p className={`font-bold ${activeTab === 'following' ? "border-b-blue-400" : "border-transparent"} border-b-[3px] pb-2`}>Following</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* this is the main content */}
                    <Content activeTab={activeTab} />
                </>
                :
                <div className="flex-1 self-center justify-center flex flex-col items-center h-svh overflow-y-auto">
                    <p className="text-blue-500 font-extrabold text-2xl">Undermaintenance</p>
                </div>
            }

            {/* all absolute */}
            {activeMenu === 0 ?
                <div className="sticky bottom-20 right-8 justify-end  self-end items-end flex mx-8">
                    <div className="flex sm:hidden bg-blue-400 rounded-full h-14 w-14 justify-center items-center">
                        <ComposeIcon className={'h-6 w-6 '} />
                        {/* <ComposeSvg /> */}
                    </div>
                </div>
                : null
            }
            {/* bottom navigation for mobile */}
            <div className='sm:hidden sticky py-4 border-t border-t-gray-100 bottom-0 flex flex-row justify-around items-center w-dvw bg-white'>
                <div onClick={() => setActiveMenu(0)}>
                    <HomeIcon isActive={activeMenu === 0} className={'h-6 w-6'} />
                </div>
                <div onClick={() => setActiveMenu(1)}>
                    <SearchIcon isActive={activeMenu === 1} className={'h-6 w-6'} />
                </div>
                <div onClick={() => setActiveMenu(2)}>
                    <BellIcon isActive={activeMenu === 2} className={'h-6 w-6'} />
                </div>
                <div onClick={() => setActiveMenu(3)}>
                    <MessageIcon isActive={activeMenu === 3} className={'h-6 w-6'} />
                </div>
            </div>

        </div>
    )
}

const Navigation = ({ activeTab, setActiveTab }: { activeTab: tabType, setActiveTab: React.Dispatch<React.SetStateAction<tabType>> }) => {
    const { setIsLoggedInCtx } = useContext(AuthContext)
    const name = localStorage.getItem('name');
    const username = localStorage.getItem('username');

    const accountItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div onClick={() => {
                    setIsLoggedInCtx(false);
                    localStorage.removeItem('accessToken')
                }}>
                    <p className='font-bold py-2'>Log out @{username}</p>
                </div>
            ),
        },
    ];

    return (
        <div className="sticky top-0 grid grid-cols-12 max-h-14">
            <div className="hidden sm:block sm:col-span-3 sticky left-0 top-0 h-svh glass-bg border-r-[1px] border-r-gray-200 sm:pl-10  py-3">
                <div className='flex flex-col flex-1 h-full'>
                    <div className='flex-1 px-2 flex flex-col gap-4 lg:ml-10 lg:mr-2'>
                        <XIcon className='h-8 w-8' />
                        <div className='flex flex-row items-center gap-4 cursor-pointer' onClick={() => console.log('-')}>
                            <HomeIcon className={'h-5 w-5'} />
                            <p className='font-bold text-lg'>Home</p>
                        </div>
                        <div className='flex flex-row items-center gap-4 cursor-pointer' onClick={() => alert('This feature is undermaintenance')}>
                            <SearchIcon className={'h-5 w-5'} />
                            <p className='text-lg'>Explore</p>
                        </div>
                        <div className='flex flex-row items-center gap-4 cursor-pointer' onClick={() => alert('This feature is undermaintenance')}>
                            <AccountIcon className={'h-5 w-5'} />
                            <p className='text-lg'>Profile</p>
                        </div>
                    </div>
                    <div className='lg:ml-5 lg:mr-2 cursor-pointer'>
                        <Dropdown menu={{ items: accountItems }} placement="top" arrow>
                            <div className='p-2 flex flex-row items-center justify-around rounded-full border border-white hover:border-gray-200'>
                                <div>
                                    <img className='w-10 h-10 rounded-full' src='https://pbs.twimg.com/profile_images/1547743320780455936/VfK1dCFG_400x400.jpg' />
                                </div>
                                <div>
                                    <p className='font-bold'>{name}</p>
                                    <p className='font-light'>@{username}</p>
                                </div>
                                <div>
                                    <ThreePoint className={'h-5 w-5'} />
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="col-span-9 sm:col-span-5 max-h-14 glass-bg  flex border-b-gray-200 border-b-[1px]  flex-row justify-around items-end">
                <div className='cursor-pointer hover:bg-slate-50 flex-1  h-full' onClick={() => { setActiveTab('for-you') }}>
                    <div className='flex items-end justify-center h-full'>
                        <p className={` py-2 border-b-4 ${activeTab === 'for-you' ? 'font-bold  border-b-blue-400' : 'border-b-transparent'}`}>For You</p>
                    </div>
                </div>
                <div className='cursor-pointer hover:bg-slate-50 flex-1 h-full' onClick={() => { setActiveTab('following') }}>
                    <div className='flex items-end justify-center h-full'>
                        <p className={` py-2 border-b-4 ${activeTab === 'following' ? 'font-bold  border-b-blue-400' : 'border-b-transparent'}`}>Following</p>
                    </div>
                </div>
                <div className='self-center justify-center items-center content-center'>
                    <div className='cursor-pointer text-center p-2  mx-2 hover:bg-gray-200 rounded-full'>
                        <GearIcon className='h-5 w-5' />
                    </div>
                </div>
            </div>
            <div className=" col-span-4 max-h-14 bg-white px-4 sm:px-10 py-2 hidden sm:block border-l-[1px]  border-l-gray-200 ">
                <div className='p-2 px-3 items-center focus-within:border-blue-400 flex flex-row border rounded-full bg-gray-100 hover:border-blue-400 border-gray-100 h-full'>
                    <SearchIcon className={'h-4 w-4'} />
                    <input placeholder='Search' className='outline-none hover:border-none px-2 bg-gray-100 w-auto flex-1 overflow-auto' />
                </div>
            </div>
        </div>
    )
}

const Content = ({ activeTab }: { activeTab: tabType }) => {
    const [textContent, setTextContent] = useState<string>('');
    const [posts, setPosts] = useState<Array<contentInt>>([]);

    useEffect(() => {
        getAll()
    }, [])

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextContent(event.target.value ?? "");
    };

    const handleSubmitPost = async () => {
        setTextContent("");
        try {
            try {
                const res = await createPost({ post: textContent });
                if (res?.status === 200) {
                    getAll()
                }
            } catch (e) {
                console.log(e, 'error posting content')
            }
        } catch (e) {

        }
    }

    const getAll = async () => {
        getAllPost().then((data: any) => setPosts(data?.data?.data?.map((mp: any) => {
            return {
                id: mp.id,
                userId: mp.user.id,
                fullName: mp.user.name,
                username: mp.user.username,
                textContent: mp.post,
                formattedUpdatedAtDifference: mp.formattedUpdatedAtDifference
            }
        })))
    }

    return (
        // checking tab is working tho
        <div className={`grid  grid-cols-12 grid-flow-col ${activeTab === 'for-you' ? 'bg-white' : 'bg-white'}`}>
            <div className="col-span-3 hidden sm:block" />
            <div className="col-span-12 sm:col-span-5 min-h-svh">
                <div className='flex flex-row  border-b border-gray-200 pb-2 p-2'>
                    <img className='md:w-10 md:h-10 w-10 h-10 sm:w-10 sm:h-10 rounded-full' src='https://pbs.twimg.com/profile_images/1547743320780455936/VfK1dCFG_400x400.jpg' />
                    <div className='flex flex-1 flex-col'>
                        <div className='mx-4 border-b border-gray-200 pb-4 flex flex-1 flex-col'>
                            <textarea value={textContent} onChange={handleInputChange} className='flex-1 py-2 my-1 text-lg focus:outline-none' placeholder='What is Happening?'>
                            </textarea>
                            <div className='hover:bg-blue-50 text-blue-400 font-extrabold cursor-pointer rounded-full self-start px-2 py-1'>
                                <p className='text-center'>🌐 Everyone can reply</p>
                            </div>
                        </div>
                        <div className='mx-4 flex flex-row items-center justify-between'>
                            <div className='flex flex-row gap-2'>
                                <ImageIcon className={'h-5 w-5 cursor-pointer'} />
                                <GifIcon className={'h-5 w-5 cursor-pointer'} />
                                <PollIcon className={'h-5 w-5 cursor-pointer'} />
                            </div>
                            <div>
                                <Button variant='primary' disabled={textContent === ""} type='button' onClick={handleSubmitPost} title='POST' />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    posts.map((dt: contentInt, index: number) => {
                        return (
                            <Post
                                refreshPosts={getAll}
                                userId={dt.userId} id={dt.id}
                                username={dt.username}
                                fullName={dt.fullName}
                                textContent={dt.textContent}
                                key={index}
                                formattedUpdatedAtDifference={dt.formattedUpdatedAtDifference}
                            />)
                    })
                }
            </div>
            <div className="col-span-4 py-10  sm:px-10 sm:flex-col  hidden sm:block border-l-[1px] border-l-gray-200 px-5  flex-1 sticky min-h-svh">
                <div className={'flex flex-col gap-3 flex-1 '}>
                    <div className='bg-gray-200 rounded-md p-4'>
                        <p className='text-lg font-bold'>Subscriber Premium</p>
                        <p className='text-xs'>Subscriber Premium</p>
                    </div>
                    <div className='bg-gray-200 rounded-md p-4 flex-1'>
                        <p>Trends Terkini</p>
                    </div>
                </div>
            </div>
        </div>)
}

const Post = ({ id, userId, username, fullName, textContent, refreshPosts, formattedUpdatedAtDifference }: {
    id: number,
    userId: number,
    username?: string,
    fullName?: string,
    textContent?: string,
    refreshPosts: any
    formattedUpdatedAtDifference?: string,
}) => {
    const authId = Number(localStorage.getItem('id'));
    const baseItem = [
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    Pin Tweet
                </a>
            ),
        },
    ]

    const authItem = [
        {
            key: '1',
            label: (
                <div onClick={() => deletePostById(id).then(() => refreshPosts())}>
                    <p>
                        Delete Tweet
                    </p>
                </div>

            ),
        },
        ...baseItem
    ]

    const items: MenuProps['items'] = authId === userId ? authItem : baseItem;

    return (
        <div className='flex flex-row hover:bg-gray-100 cursor-pointer p-2 py-1 border-b'>
            <div className='m-1'>
                <img className='w-10 h-10 rounded-full' src='https://pbs.twimg.com/profile_images/1547743320780455936/VfK1dCFG_400x400.jpg' />
            </div>
            <div className='flex flex-col flex-1 px-2 py-1'>
                <div className='flex flex-row'>
                    <a href="#" className='flex-1'>
                        <p className='text-sm text-black font-semibold'>{fullName} <span className='font-light'>@{username} · </span><span className='text-xs font-light'>{formattedUpdatedAtDifference}</span>  </p>
                    </a>
                    <Dropdown menu={{ items }} placement="bottomRight" arrow>
                        <div className='hover:bg-blue-100 p-1 font-extrabold cursor-pointer rounded-full'>
                            <ThreePoint className={'h-4 w-4'} />
                        </div>
                    </Dropdown>
                </div>
                <div className='pb-4'>
                    <div dangerouslySetInnerHTML={{ __html: textContent?.replace(/\n/g, '<br />') ?? '' }} />
                </div>
                <div className='flex flex-row justify-between flex-1 px-2'>
                    <div className='hover:bg-blue-100 p-1 font-extrabold cursor-pointer rounded-full'>
                        <ChatIcon className={'h-4 w-4'} />
                    </div>
                    <div className='hover:bg-blue-100 p-1 font-extrabold cursor-pointer rounded-full'>
                        <RetweetIcon className={'h-4 w-4'} />
                    </div>
                    <div className='hover:bg-blue-100 p-1 font-extrabold cursor-pointer rounded-full'>
                        <LoveIcon className={'h-4 w-4'} />
                    </div>
                    <div className='hover:bg-blue-100 p-1 font-extrabold cursor-pointer rounded-full'>
                        <StatsIcon className={'h-4 w-4'} />
                    </div>
                    <div className='flex flex-row gap-2'>
                        <div className='hover:bg-blue-100 p-1 font-extrabold cursor-pointer rounded-full'>
                            <SaveIcon className={'h-4 w-4'} />
                        </div>
                        <div className='hover:bg-blue-100 p-1 font-extrabold cursor-pointer rounded-full'>
                            <ShareIcon className={'h-4 w-4'} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home;