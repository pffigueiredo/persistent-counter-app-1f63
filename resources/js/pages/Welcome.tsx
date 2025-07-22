import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface WelcomeProps extends SharedData {
    count: number;
    [key: string]: unknown;
}

export default function Welcome() {
    const { auth, count } = usePage<WelcomeProps>().props;

    const handleIncrement = () => {
        router.post(route('counter.store'), {}, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleDecrement = () => {
        router.patch(route('counter.update'), {}, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title="Counter App">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-center shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-8 text-4xl font-bold">Counter App</h1>
                            
                            <div className="mb-8 text-center">
                                <div className="mb-6 text-8xl font-bold text-[#f53003] dark:text-[#FF4433]">
                                    {count || 0}
                                </div>
                                <p className="text-lg text-[#706f6c] dark:text-[#A1A09A]">Current Count</p>
                            </div>

                            <div className="flex justify-center gap-4">
                                <Button 
                                    onClick={handleDecrement}
                                    variant="outline"
                                    size="lg"
                                    className="px-8 py-4 text-lg font-semibold"
                                >
                                    - Decrement
                                </Button>
                                <Button 
                                    onClick={handleIncrement}
                                    size="lg"
                                    className="px-8 py-4 text-lg font-semibold bg-[#f53003] hover:bg-[#d42a00] dark:bg-[#FF4433] dark:hover:bg-[#e63b2e]"
                                >
                                    + Increment
                                </Button>
                            </div>

                            <footer className="mt-12 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                Counter value is stored persistently in the database
                            </footer>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}