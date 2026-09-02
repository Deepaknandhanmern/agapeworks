"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export default function Testimonial1() {
  return (
    <div className="w-full grid place-content-center px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-muted px-4 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            How we work
          </div>
        </div>

        {/* Main heading with inline hover avatars */}
        <div className="relative mx-auto max-w-screen-xl text-center text-foreground">
          <h2 className="text-2xl font-semibold leading-tight md:text-3xl lg:text-5xl">
            We make it easy for <br className="sm:hidden" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative mx-2 inline-block origin-center align-middle">
                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-background transition-all duration-300 sm:w-16 md:hover:w-36">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                        alt="Founder"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs rounded-lg border-none bg-popover p-4 text-popover-foreground shadow-lg"
                >
                  <p className="text-sm">
                    Direct access to the engineers building your product - no account
                    layer relaying messages.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            founders and
          </h2>

          <h2 className="text-2xl font-semibold leading-tight md:text-3xl lg:text-5xl">
            their
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mx-2 inline-block align-middle">
                    <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-background transition-all duration-300 sm:w-16 lg:hover:w-36">
                      <img
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=200&auto=format&fit=crop"
                        alt="Product team"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs rounded-lg border-none bg-popover p-4 text-popover-foreground shadow-lg"
                >
                  <p className="text-sm">
                    Weekly, working demos - you see real progress every week, not a
                    status report.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            teams to
          </h2>
          <h2 className="text-2xl font-semibold leading-tight text-muted-foreground md:text-3xl lg:text-5xl">
            ship real, working software
          </h2>
        </div>
      </div>
    </div>
  );
}
