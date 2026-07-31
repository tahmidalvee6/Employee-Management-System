

const LoginLeftSide = () => {
    return (
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 border-slate-200 relative overflow-hidden">
            <div className="absolute -top-32 -left-32 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-40 -right-32 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
            <div className="absolute top-1/3 right-8 w-1 h-48 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full opacity-30"></div>

            <div className="relative z-10 flex flex-col items-start justify-center p-12 lg:p-20 w-full h-full">
                <div className="inline-block bg-indigo-800/30 border border-indigo-700/40 rounded-xl px-4 py-2 mb-8 backdrop-blur-sm">
                    <span className="text-sm font-medium text-indigo-300">Employee Management System</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                    Empowering <br />
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                        Modern Workforce
                    </span>
                </h1>
                <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                    Streamline your workforce operations, track attendance, manage payroll,
                    and empower your team with our comprehensive management solution.
                </p>
            </div>
        </div>
    )
}

export default LoginLeftSide
