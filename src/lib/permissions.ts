export const teamPermissions = [
  'manage_tools',
  'manage_jobs',
  'manage_docs',
  'manage_ads',
  'manage_seo',
  'manage_users',
  'manage_settings',
  'view_analytics'
] as const;

export type TeamPermission = (typeof teamPermissions)[number];

export function defaultPermissions() {
  return teamPermissions.reduce<Record<TeamPermission, boolean>>((acc, perm) => {
    acc[perm] = true;
    return acc;
  }, {} as Record<TeamPermission, boolean>);
}
