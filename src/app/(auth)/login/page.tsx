import LoginCard from '@/components/login-card';
import { Suspense } from 'react';

function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='flex items-center justify-center h-full w-full'>
                <LoginCard />
            </div>
        </Suspense>
    );
}
export default LoginPage;
