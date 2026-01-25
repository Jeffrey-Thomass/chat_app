import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import BorderAnimatedContainer from '../components/BorderAnimatedComponent.jsx'
import ContactList from '../components/ContactList.jsx'
import ChatsList from '../components/ChatsList.jsx'
import ActiveTabSwitch from '../components/ActiveTabSwitch.jsx'
import ProfileHeader from '../components/ProfileHeader.jsx'
import ChatContainer from '../components/ChatContainer.jsx'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder.jsx'

export default function ChatPage() {
  const activeTab = useChatStore(state => state.activeTab)
  const selectedUser = useChatStore(state => state.selectedUser)

  return (
    <div className="relative flex items-center justify-center w-full h-screen px-4 overflow-hidden bg-base-100">
      
      {/* 1. Ambient Background Glows */}
      {/* These add a modern, diffuse lighting effect behind the glass card */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Layout Constraint */}
      <div className="relative w-full max-w-6xl h-[85vh]">
        <BorderAnimatedContainer>
          
          {/* Inner Card - Flex Container */}
          <div className="flex h-full w-full overflow-hidden rounded-xl bg-base-100/40 backdrop-blur-lg shadow-2xl border border-white/5">
            
            {/* LEFT SIDEBAR */}
            <aside className="w-80 flex flex-col h-full border-r border-white/10 bg-base-200/50">
              
              <div className="p-4 pb-2">
                <ProfileHeader />
              </div>
              
              <div className="px-4 pb-2">
                 <ActiveTabSwitch />
              </div>

              {/* Scroll Area with custom gradient mask at the bottom for smooth fade */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent mask-image-b-fade">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </aside>

            {/* CHAT AREA */}
            <main className="flex-1 flex flex-col relative bg-base-100/30">
              
              {/* Subtle Grid Pattern Overlay for Texture */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {selectedUser ? (
                <ChatContainer />
              ) : (
                <div className="flex-1 flex items-center justify-center relative z-10">
                   <NoConversationPlaceholder />
                </div>
              )}
            </main>

          </div>
        </BorderAnimatedContainer>
      </div>
      {/* 🔖 TEMP WATERMARK / NOTICE */}
      {(
        <div className="fixed  bottom-3 right-3 z-[9999] rounded-md bg-black/70 px-3 py-1 text-xs text-white pointer-events-none">
          ⚠️ If the chat appears misaligned or doesn’t update correctly, please perform a hard refresh.
        </div>
      )}
    </div>
  )
}