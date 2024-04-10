import * as React from 'react';
import { Files, Vault, Activity, Folder, Cog } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Nav } from './components/nav';
import { useElectron } from '@/providers/electron';
import { ConnectionStatus } from '@/types';
import { useCallback } from 'react';
import logo from '@/assets/logo.png';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ResetKeyModal } from '@/components/reset-key-modal';
import { useFile } from '@/providers/files';
import { useApi } from '@/hooks/use-api';
import { useVault } from '@/providers/vault';

interface MailProps {
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function PrimaryLayout({
  defaultLayout = [20, 40, 40],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed] = React.useState(defaultCollapsed);
  const { connectionStatus } = useElectron();
  const { fileListCount } = useFile();
  const { openRootModelFolder } = useApi();
  const { vault } = useVault();

  const connectionRender = useCallback(
    (connectionStatus: ConnectionStatus) => {
      switch (connectionStatus) {
        case ConnectionStatus.CONNECTED:
          return <div className="rounded-full w-2 h-2 bg-[#1EBD8E]" />;
        case ConnectionStatus.DISCONNECTED:
          return <div className="rounded-full w-2 h-2 bg-[#F15252]" />;
        case ConnectionStatus.CONNECTING:
          return <div className="rounded-full w-2 h-2 bg-[#FDAA3E]" />;
        default:
          return <div className="rounded-full w-2 h-2 bg-[#FDAA3E]" />;
      }
    },
    [connectionStatus],
  );

  // TODO: Add back collapsable navigation
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          minSize={defaultLayout[0]}
          className={cn(
            isCollapsed &&
              'min-w-[50px] transition-all duration-300 ease-in-out',
          )}
        >
          <div
            className={cn(
              'flex h-[56px] items-center justify-between',
              isCollapsed ? 'h-[52px]' : 'px-2',
            )}
          >
            <a href="https://civitai.com/" target="_blank">
              <img src={logo} alt="logo" className="w-10 h-10" />
            </a>
            <Dialog>
              {connectionStatus === ConnectionStatus.CONNECTED ? (
                <div className="flex items-center space-x-2 rounded-full border-[#373A40] border px-3 py-2">
                  {connectionRender(connectionStatus)}
                  <p className="text-sm capitalize">connected</p>
                </div>
              ) : connectionStatus === ConnectionStatus.DISCONNECTED ? (
                <DialogTrigger asChild>
                  <div className="flex items-center space-x-2 rounded-full border-[#373A40] border px-3 py-2 cursor-pointer">
                    {connectionRender(connectionStatus)}
                    <p className="text-sm capitalize">no key</p>
                  </div>
                </DialogTrigger>
              ) : (
                <a href="https://civitai.com/" target="_blank">
                  <div className="flex items-center space-x-2 rounded-full border-[#373A40] border px-3 py-2">
                    {connectionRender(connectionStatus)}
                    <p className="text-sm capitalize">disconnected</p>
                  </div>
                </a>
              )}
              <ResetKeyModal />
            </Dialog>
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: 'Files',
                label: fileListCount.toString(),
                icon: Files,
                variant: 'default',
                href: '/files',
              },
              {
                title: 'Vault',
                label: vault.length.toString(),
                icon: Vault,
                variant: 'ghost',
                href: '/vault',
              },
              {
                title: 'Activities',
                label: '',
                icon: Activity,
                variant: 'ghost',
                href: '/activities',
              },
              {
                title: 'Open Model Folder',
                label: '',
                icon: Folder,
                variant: 'ghost',
                href: '/open-model-folder',
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  openRootModelFolder();
                },
              },
              {
                title: 'Settings',
                label: '',
                icon: Cog,
                variant: 'ghost',
                href: '/settings',
              },
            ]}
          />
        </ResizablePanel>
        <Outlet />
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
