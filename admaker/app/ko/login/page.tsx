'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getMediaUrl } from '@/lib/cloudflare-config';

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam) {
            setError('인증 실패. 다시 시도해주세요.');
        }
    }, [searchParams]);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/ko/payment`,
                },
            });

            if (error) throw error;
        } catch (error) {
            console.error('Login error:', error);
            setError('로그인 중 오류가 발생했습니다.');
            setIsLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/ko/payment`,
                },
            });

            if (error) throw error;
            setEmailSent(true);
        } catch (error) {
            console.error('Email login error:', error);
            setError('이메일 전송 중 오류가 발생했습니다.');
            setIsLoading(false);
        }
    };

    if (emailSent) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a0a',
                padding: '20px'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '40px',
                    maxWidth: '450px',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>📧</div>
                    <h2 style={{ fontSize: '24px', color: 'white', marginBottom: '10px' }}>
                        이메일을 확인하세요
                    </h2>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                        {email}로 로그인 링크를 보냈습니다. 이메일을 확인하고 링크를 클릭하여 로그인하세요.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            background: '#0a0a0a'
        }}>
            {/* Left side - Login Form */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '40px',
                    maxWidth: '450px',
                    width: '100%'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <img
                            src={getMediaUrl('admaker_ai_logo-removebg-preview.png')}
                            alt="AdMaker AI"
                            style={{ height: '60px', marginBottom: '20px' }}
                        />
                        <h1 style={{ fontSize: '24px', color: 'white', marginBottom: '10px' }}>
                            20,000명 이상의 크리에이터와 함께하세요
                        </h1>
                    </div>

                    {error && (
                        <div style={{
                            background: 'rgba(255, 0, 0, 0.1)',
                            border: '1px solid rgba(255, 0, 0, 0.3)',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '20px',
                            color: '#ff6b6b',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: 'white',
                            color: '#000',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'transform 0.2s',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                            <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                            <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
                            <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
                        </svg>
                        {isLoading ? '로딩 중...' : 'Google로 계속하기'}
                    </button>

                    <div style={{
                        margin: '20px 0',
                        textAlign: 'center',
                        color: 'rgba(255, 255, 255, 0.5)',
                        position: 'relative'
                    }}>
                        <span style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            padding: '0 10px',
                            position: 'relative',
                            zIndex: 1
                        }}>또는</span>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            zIndex: 0
                        }}></div>
                    </div>

                    <form onSubmit={handleEmailLogin}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일 주소"
                            required
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '16px',
                                marginBottom: '12px',
                                outline: 'none'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !email}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: 'linear-gradient(135deg, #ff0844 0%, #ff5478 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: (isLoading || !email) ? 'not-allowed' : 'pointer',
                                opacity: (isLoading || !email) ? 0.7 : 1,
                                transition: 'transform 0.2s'
                            }}
                        >
                            {isLoading ? '로딩 중...' : '이메일로 계속하기'}
                        </button>
                    </form>

                    <p style={{
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        textAlign: 'center',
                        lineHeight: '1.5',
                        marginTop: '20px'
                    }}>
                        "계속"을 클릭하면 <a href="/terms" style={{ color: '#ff0844' }}>서비스 약관</a> 및 <a href="/privacy" style={{ color: '#ff0844' }}>개인정보 보호정책</a>에 동의하는 것입니다
                    </p>
                </div>
            </div>

            {/* Right side - Testimonials */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(255, 8, 68, 0.1) 0%, rgba(255, 84, 120, 0.05) 100%)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '20px'
            }}>
                <h2 style={{ fontSize: '20px', color: 'white', marginBottom: '10px' }}>
                    크리에이터들의 이야기
                </h2>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '20px'
                }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                        {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ color: '#ffd700', fontSize: '16px' }}>★</span>
                        ))}
                    </div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
                        "AdMaker AI는 제 콘텐츠 제작 워크플로우를 완전히 바꿔놓았습니다. 이제 몇 분 만에 전문가 수준의 광고를 만들 수 있습니다!"
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                        - 김민준, YouTube 크리에이터
                    </p>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '20px'
                }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                        {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ color: '#ffd700', fontSize: '16px' }}>★</span>
                        ))}
                    </div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
                        "놀라운 결과물입니다! AI가 생성한 광고가 제 브랜드와 완벽하게 어울립니다. 시간과 비용을 크게 절약했습니다."
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                        - 박서연, 마케팅 디렉터
                    </p>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '20px'
                }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                        {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ color: '#ffd700', fontSize: '16px' }}>★</span>
                        ))}
                    </div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
                        "사용하기 쉽고 결과물이 훌륭합니다. 모든 소셜 미디어 관리자에게 추천합니다!"
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                        - 이지훈, 소셜 미디어 매니저
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function LoginKo() {
    return (
        <Suspense fallback={
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a0a',
                color: 'white'
            }}>
                로딩 중...
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
