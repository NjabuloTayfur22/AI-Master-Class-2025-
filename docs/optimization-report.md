# Optimization Report

## Performance Benchmarks

- **Build size**: 642 kB JS bundle (gzip 192 kB).
- **Chunk warnings**: One chunk over 500 kB (see build log).

## Improvements Implemented

1. **Animation Throttling**
   - Navigation and Hero components now respect `prefers-reduced-motion` and adjust update intervals based on device type.
2. **Particle Reduction**
   - Hero component scales floating particle count down on mobile to reduce DOM nodes.
3. **Compression Middleware**
   - Express server now uses `compression` to serve gzip responses.
4. **Dependencies**
   - Added `compression` package.
5. **Throttled Events**
   - Expensive scroll and mousemove handlers now run through a throttle helper to minimize jank.
6. **Passive Listeners**
   - Scroll and touch listeners are registered with `passive: true` to avoid blocking rendering.
7. **Lazy-loaded Images**
   - Hero and Overview illustrations use `loading="lazy"` so off-screen assets don’t delay initial paint.
8. **Mobile-Friendly Background**
   - Heavy fixed backgrounds are disabled on small screens in favor of simpler gradients for smoother scrolling.

## Future Maintenance

- Run `npm audit` periodically to address vulnerabilities.
- Monitor bundle size and split code when large warnings appear.
- Update browserslist database regularly (`npx update-browserslist-db@latest`).
