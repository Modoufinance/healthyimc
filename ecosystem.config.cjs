module.exports = {
  apps: [{
    name: 'healthyimc-app',
    script: 'npm',
    args: 'run dev -- --host 0.0.0.0',
    cwd: '/home/user/webapp',
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      VITE_HOST: '0.0.0.0'
    },
    watch: false,
    ignore_watch: ['node_modules', '.git'],
    log_file: '/home/user/webapp/logs/combined.log',
    out_file: '/home/user/webapp/logs/out.log',
    error_file: '/home/user/webapp/logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    restart_delay: 1000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};