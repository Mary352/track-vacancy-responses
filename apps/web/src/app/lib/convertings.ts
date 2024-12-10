export const getBaseUrl = () => {
   const url_base = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_CODESANDBOX_HOST;
   console.log("url_base: ", url_base)
   let url_codesandbox_base;

   if (url_base && !url_base.includes('localhost')) {
      url_codesandbox_base = `https://${url_base.replace('3000', '3001')}`;

      console.log("url_codesandbox_base: ", url_codesandbox_base)
      return url_codesandbox_base
   }

   return url_base
}