import type { Meta } from '@storybook/react';
import {
    Button,
    Toolbar,
    TabBar,
    Alert,
    PopUpButtonMenu,
    Growl,
    Sheet,
} from '../index';
import {
    faEllipsisH,
    faCheck,
    faHome,
    faUser,
    faPlus,
    faBell,
    faTrash,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const meta = {
    title: 'Examples/Showcase',
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta;

export default meta;

export const MobileAppDemo = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [showGrowl, setShowGrowl] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleTabChange = (id: string) => {
        if (id === 'add') {
            setIsSheetOpen(true);
        } else {
            setActiveTab(id);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#e5e5e5',
            padding: '40px 20px',
        }}>
            {/* iPhone Frame Container */}
            <div style={{
                width: '390px',                    // ≈ iPhone 16/16 Pro width in points
                height: '844px',                   // ≈ iPhone 16 height
                background: '#000',
                borderRadius: '60px',              // Realistic large corner radius for modern iPhone
                boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.4)',
                border: '14px solid #111',         // Slightly thicker bezel
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Scrollable Content Area */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch', // Smooth iOS scrolling feel
                }}>
                    <div style={{
                        height: '220%',                 // Extra height to demonstrate scroll
                        backgroundImage: 'url("https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=andrew-pons-lylCw4zcA7I-unsplash.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                    }} />
                </div>


                {/* Top Toolbar – floating style */}
                <div style={{
                    position: 'absolute',
                    top: 14,
                    left: 0,
                    right: 0,
                    zIndex: 200,
                    padding: '0px 0px',
                }}>
                    <Toolbar
                        children={<Button icon={faTrash} variant="danger" onClick={() => setIsDeleteAlertOpen(true)} />}
                        rightElement={
                            <div style={{ display: 'flex', gap: 8 }}>
                                <PopUpButtonMenu
                                    align="right"
                                    trigger={<Button icon={faEllipsisH} variant="secondary" />}
                                    items={[
                                        { id: '1', label: 'Edit', onClick: () => console.log('Edit') },
                                        { id: '2', label: 'Duplicate', onClick: () => console.log('Duplicate') },
                                        { id: 'sep1', label: '', onClick: () => { }, type: 'separator' },
                                        { id: '3', label: 'Share', onClick: () => console.log('Share') },
                                    ]}
                                />
                                <Button icon={faCheck} variant="primary" onClick={() => setShowGrowl(true)} />
                            </div>
                        }
                    />
                </div>

                {/* Floating iOS-style Bottom Tab Bar (Liquid Glass look) */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '0 5px 5px 5px',   // ← Key: side margins + bottom safe area inset simulation
                    pointerEvents: 'none',          // Let clicks pass through wrapper
                    zIndex: 250,
                }}>
                    <div style={{ pointerEvents: 'auto' }}> {/* Re-enable clicks only on tab bar */}
                        <TabBar
                            items={[
                                { id: 'home', label: 'Home', icon: <FontAwesomeIcon icon={faHome} /> },
                                { id: 'add', label: 'Add', icon: <FontAwesomeIcon icon={faPlus} /> },
                                { id: 'notifications', label: 'Alerts', icon: <FontAwesomeIcon icon={faBell} /> },
                                { id: 'profile', label: 'Profile', icon: <FontAwesomeIcon icon={faUser} /> },
                            ]}
                            activeTabId={activeTab}
                            onTabChange={handleTabChange}
                            showSearch={true}
                            onSearch={(q) => console.log('Search clicked', q)}
                        />
                    </div>
                </div>
                <Alert
                    isOpen={isDeleteAlertOpen}
                    title="Delete Items?"
                    message="This action cannot be undone. Are you sure you want to delete these items?"
                    onClose={() => setIsDeleteAlertOpen(false)}
                    actions={[
                        {
                            label: 'Cancel',
                            onClick: () => console.log('Cancelled'),
                            variant: 'cancel'
                        },
                        {
                            label: 'Delete',
                            onClick: () => {
                                console.log('Deleted successfully');
                                setIsDeleteAlertOpen(false);
                            },
                            variant: 'destructive'
                        }
                    ]}
                />

                <Growl
                    message="Changes Saved Successfully"
                    visible={showGrowl}
                    icon={faCheck}
                    onDismiss={() => setShowGrowl(false)}
                />

                <Sheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} position="absolute" forceMobile>
                    <Toolbar
                        title="Edit Details"
                        style={{ background: 'transparent', backdropFilter: 'none' }}
                        children={<Button variant="ghost" icon={faTimes} onClick={() => setIsSheetOpen(false)} />}
                        rightElement={<Button variant="primary" icon={faCheck} onClick={() => { setIsSheetOpen(false); setShowGrowl(true); }} />}
                    />
                    <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Button label="Take Photo" variant="secondary" fullWidth icon={faPlus} />
                            <Button label="Choose from Library" variant="secondary" fullWidth />
                            <Button label="Create Blank" variant="primary" fullWidth />
                        </div>
                    </div>
                </Sheet>
            </div>
        </div>
    );
};