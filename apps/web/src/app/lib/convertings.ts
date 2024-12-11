export const getBaseUrl = () => {
   const url_base = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_CODESANDBOX_HOST;
   console.log("url_base: ", url_base)
   let url_codesandbox_base;

   if (url_base && !url_base.includes('localhost') && process.env.NEXT_PUBLIC_CODESANDBOX_HOST) {
      console.log("url_base.replace('$PORT', '3001'): ", url_base.replace('$PORT', '3001'))

      url_codesandbox_base = `https://${url_base.replace('$PORT', '3001')}`;

      console.log("url_codesandbox_base: ", url_codesandbox_base)
      return url_codesandbox_base
   }

   return url_base
}