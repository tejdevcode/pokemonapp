export function CardSkeleton() {
   return (
      <div role="status" class="max-w-sm animate-pulse">
         <div class="mb-2.5 h-40 max-w-[300px] rounded-md bg-gray-200 dark:bg-gray-700"></div>
         <div class="mb-2.5 h-2 max-w-[150px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
         <div class="mb-2.5 h-2 max-w-[100px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
   )
}