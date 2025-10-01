import { Link } from 'react-router';

function Home() {
    return (

        <>
            <div className="fixed min-h-screen w-screen bg-[url('/images/city3.jpg')] bg-center bg-cover bg-no-repeat m-0 p-1">
                <div className="h-screen flex flex-col items-center mt-30">
                    <div className="relative font-gossip font-size: text-9xl text-center text-white ">lovebot
                        <img src="/images/lips.svg" className="absolute w-30 h-30 -bottom-10 -right-5 rotate-25"></img>
                    </div>


                    <div className="flex flex-row text-white">
                        <Link to="signup" className="p-10 border-2 m-5">signup</Link>
                        <Link to="login" className="p-10 border-2 m-5">login</Link>
                    </div>

                </div>
            </div>








        </>





    )
}

export default Home
