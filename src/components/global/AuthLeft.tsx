import { Button } from "../ui/button";

export default function AuthLeft() {
    return (
        <div className="relative hidden lg:flex items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/images/signup-bg.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-primary" />

            {/* Content */}
            <div className="relative z-10 max-w-xl text-white space-y-6 px-8">
                <h1 className="text-4xl font-bold leading-tight">
                    Welcome to the Biggest <br /> Social Network in the World
                </h1>

                <p className="text-sm text-orange-100">
                    We are the best and biggest social network with 5 billion active
                    users all around the world. Share your thoughts, write blog posts,
                    earn badges and much more!
                </p>

                <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-orange-500"
                >
                    Register Now!
                </Button>
            </div>
        </div>
    )
}