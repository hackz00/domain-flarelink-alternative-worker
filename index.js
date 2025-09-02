export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const subdomain = url.hostname.split(".")[0];
    
    const choice = await env.FLARELINK_KV.get(subdomain);
    if (choice) {
      return Response.redirect(choice, 302);
    }

    const target = `http://172.96.141.252`; 
    await env.FLARELINK_KV.put(subdomain, target);
    return Response.redirect(target, 302);
  }
}
