import {
    Button,
    Toolbar,
    TabBar,
    Alert,
    PopUpButtonMenu,
    Growl,
    Sheet,
    GlassPanel,
    List,
    ListItem,
    Input,
    TextArea,
    Checkbox,
    ComboBox,
    StarRating,
    ButtonGroup,
    UserAvatar,
    ShareButton,
    Grid,
    EmptyState,
    ErrorMessage,
    SideDrawer,
    Popover,
    SwipeableRow,
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
    faBars,
    faUndo,
    faRedo,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const Showcase = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [showGrowl, setShowGrowl] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [checked, setChecked] = useState(false);
    const [rating, setRating] = useState(0);
    const [category, setCategory] = useState('');
    const [buttonGroupValue, setButtonGroupValue] = useState('Option 1');
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleTabChange = (id: string) => {
        setActiveTab(id);
    };

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100vh',
            backgroundImage: 'url("https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=andrew-pons-lylCw4zcA7I-unsplash.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
        }}>
            {/* Scrollable Content Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch', // Smooth iOS scrolling feel
                position: 'relative',
            }}>
                <div style={{
                    minHeight: '100%',
                    paddingBottom: '100px', // Space for tab bar
                    paddingTop: '60px', // Space for toolbar
                }}>
                    <div style={{ padding: '20px' }}>
                        {activeTab === 'home' && (
                            <>
                                <GlassPanel style={{ padding: '24px' }}>
                                    <h1 style={{ fontFamily: 'var(--lg-font-family)', fontWeight: 700, fontSize: '24px', marginBottom: '8px' }}>Welcome Home</h1>
                                    <p style={{ fontFamily: 'var(--lg-font-family)', color: '#666' }}>This is a responsive showcase of Liquid Glass components.</p>

                                    <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
                                        <div style={{ height: '100px', background: 'rgba(255,255,255,0.5)', borderRadius: '16px', padding: '16px' }}>Card 1</div>
                                        <div style={{ height: '100px', background: 'rgba(255,255,255,0.5)', borderRadius: '16px', padding: '16px' }}>Card 2</div>
                                        <div style={{ height: '100px', background: 'rgba(255,255,255,0.5)', borderRadius: '16px', padding: '16px' }}>Card 3</div>
                                    </div>
                                </GlassPanel>

                                <div style={{ height: '24px' }} />

                                <GlassPanel style={{ padding: '24px' }}>
                                    <h2 style={{ fontFamily: 'var(--lg-font-family)', fontWeight: 600, fontSize: '20px', marginBottom: '16px' }}>Recent Layouts</h2>
                                    <List>
                                        <SwipeableRow
                                            onSwipeLeft={() => console.log('Delete')}
                                            onSwipeRight={() => console.log('Archive')}
                                            leftActionIcon={<FontAwesomeIcon icon={faTrash} />}
                                            rightActionIcon={<FontAwesomeIcon icon={faCheck} />}
                                        >
                                            <ListItem
                                                title="Living Room Setup"
                                                subtitle="Modified 2 hours ago"
                                                rightElement={<Button variant="ghost" flat icon={faEllipsisH} aria-label="More options" />}
                                            />
                                        </SwipeableRow>
                                        <SwipeableRow
                                            onSwipeLeft={() => console.log('Delete')}
                                            onSwipeRight={() => console.log('Archive')}
                                            leftActionIcon={<FontAwesomeIcon icon={faTrash} />}
                                            rightActionIcon={<FontAwesomeIcon icon={faCheck} />}
                                        >
                                            <ListItem
                                                title="Kitchen Renovation"
                                                subtitle="Modified yesterday"
                                                rightElement={<Button variant="ghost" flat icon={faEllipsisH} aria-label="More options" />}
                                            />
                                        </SwipeableRow>
                                        <SwipeableRow
                                            onSwipeLeft={() => console.log('Delete')}
                                            onSwipeRight={() => console.log('Archive')}
                                            leftActionIcon={<FontAwesomeIcon icon={faTrash} />}
                                            rightActionIcon={<FontAwesomeIcon icon={faCheck} />}
                                        >
                                            <ListItem
                                                title="Master Bedroom"
                                                subtitle="Modified 3 days ago"
                                                rightElement={<Button variant="ghost" flat icon={faEllipsisH} aria-label="More options" />}
                                            />
                                        </SwipeableRow>
                                    </List>
                                </GlassPanel>

                                <div style={{ height: '24px' }} />

                                <GlassPanel style={{ padding: '24px' }}>
                                    <h2 style={{ fontFamily: 'var(--lg-font-family)', fontWeight: 600, fontSize: '20px', marginBottom: '16px' }}>Advanced & Interactions</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        <div>
                                            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Swipeable List Item</h3>
                                            <List>
                                                <SwipeableRow
                                                    onSwipeLeft={() => console.log('Delete')}
                                                    onSwipeRight={() => console.log('Archive')}
                                                    leftActionIcon={<FontAwesomeIcon icon={faTrash} />}
                                                    rightActionIcon={<FontAwesomeIcon icon={faCheck} />}
                                                >
                                                    <ListItem
                                                        title="Swipe Me!"
                                                        subtitle="Swipe left to delete, right to check"
                                                    />
                                                </SwipeableRow>
                                            </List>
                                            <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
                                                (Note: Swipe interaction works best on touch or with precision trackpad)
                                            </p>
                                        </div>
                                    </div>
                                </GlassPanel>
                            </>
                        )}

                        {activeTab === 'add' && (
                            <GlassPanel style={{ padding: '24px' }}>
                                <Toolbar leftElement={<Button label="Back" variant="ghost" size='sm' icon={faArrowLeft} onClick={() => setActiveTab('home')} />}
                                    title="Forms"
                                    rightElement={<ButtonGroup size="sm" variant='ghost' items={[
                                        { id: '1', label: 'Undo', icon: faUndo, onClick: () => setButtonGroupValue('Option 1'), active: buttonGroupValue === 'Option 1' },
                                        { id: '2', label: 'Redo', icon: faRedo, onClick: () => setButtonGroupValue('Option 2'), active: buttonGroupValue === 'Option 2' },
                                    ]} />}
                                />

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="full-name" style={{ fontSize: '14px', fontWeight: 500, opacity: 0.8 }}>Full Name</label>
                                        <Input id="full-name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="notes" style={{ fontSize: '14px', fontWeight: 500, opacity: 0.8 }}>Notes</label>
                                        <TextArea id="notes" placeholder="Enter additional details" value={notes} onChange={(e) => setNotes(e.target.value)} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                        <Checkbox label="Agree to Terms" checked={checked} onChange={setChecked} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: 500 }}>Rating:</span>
                                            <StarRating rating={rating} onChange={setRating} />
                                        </div>
                                    </div>
                                    <ComboBox
                                        label="Category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="1">Design</option>
                                        <option value="2">Development</option>
                                        <option value="3">Marketing</option>
                                    </ComboBox>
                                </div>
                            </GlassPanel>
                        )}

                        {activeTab === 'notifications' && (
                            <GlassPanel style={{ padding: '24px' }}>
                                <h2 style={{ fontFamily: 'var(--lg-font-family)', fontWeight: 600, fontSize: '20px', marginBottom: '16px' }}>Feedback & Triggers</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                                    <div>
                                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Error & Alerts</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <ErrorMessage message="This is an error message example." />
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <Button label="Show Growl" onClick={() => setShowGrowl(true)} />
                                                <Button label="Open Sheet" onClick={() => setIsSheetOpen(true)} />
                                                <Button label="Toggle Side Drawer" onClick={() => setIsSideDrawerOpen(!isSideDrawerOpen)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Popover</h3>
                                        <Button label="Open Popover" variant="secondary" onClick={() => setIsPopoverOpen(true)} />
                                        <Popover
                                            isOpen={isPopoverOpen}
                                            onClose={() => setIsPopoverOpen(false)}
                                            title="Popover Title"
                                        >
                                            <div style={{ padding: '0', width: '200px' }}>
                                                <p style={{ margin: 0, fontSize: '14px' }}>This is a popover content.</p>
                                                <Button label="Action" size="sm" style={{ marginTop: '8px' }} />
                                            </div>
                                        </Popover>
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Empty State</h3>
                                        <EmptyState
                                            icon={faTrash}
                                            title="No Items"
                                            description="This list is empty."
                                            action={<Button label="Add Item" size="sm" />}
                                        />
                                    </div>
                                </div>
                            </GlassPanel>
                        )}

                        {activeTab === 'profile' && (
                            <GlassPanel style={{ padding: '24px' }}>
                                <h2 style={{ fontFamily: 'var(--lg-font-family)', fontWeight: 600, fontSize: '20px', marginBottom: '16px' }}>Data Display</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <UserAvatar displayName="User One" photoURL="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" size="48px" />
                                        <UserAvatar displayName="Pro User" photoURL="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" size="48px" />
                                        <UserAvatar displayName="Small User" photoURL="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" size="32px" />
                                    </div>

                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 500 }}>Share Action:</span>
                                        <ShareButton title="Check this out!" url="https://example.com" label="Share Page" variant="secondary" />
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Grid Layout</h3>
                                        <Grid style={{ gap: '16px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>Item 1</div>
                                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>Item 2</div>
                                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>Item 3</div>
                                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>Item 4</div>
                                        </Grid>
                                    </div>
                                </div>
                            </GlassPanel>
                        )}
                    </div>
                </div>
            </div>


            {/* Side Drawer */}
            <SideDrawer isOpen={isSideDrawerOpen} onToggle={() => setIsSideDrawerOpen(!isSideDrawerOpen)} hideToggle={true}>
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Drawer Content</h3>
                        <Button variant="ghost" icon={faTimes} onClick={() => setIsSideDrawerOpen(false)} aria-label="Close Drawer" />
                    </div>
                    <p>Navigation or details go here.</p>
                </div>
            </SideDrawer>


            {/* Top Toolbar – fixed */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 200,
            }}>
                <Toolbar
                    children={
                        <div style={{ display: 'flex', gap: 8 }}>
                            <Button icon={faBars} variant="ghost" onClick={() => setIsSideDrawerOpen(!isSideDrawerOpen)} aria-label="Toggle Menu" />
                            <Button icon={faTrash} variant="danger" onClick={() => setIsDeleteAlertOpen(true)} aria-label="Delete Items" />
                        </div>
                    }
                    rightElement={
                        <div style={{ display: 'flex', gap: 8 }}>
                            <PopUpButtonMenu
                                align="right"
                                matchMenuWidth={false}
                                trigger={<Button icon={faEllipsisH} variant="secondary" aria-label="More actions" />}
                                items={[
                                    { id: '1', label: 'Edit', onClick: () => console.log('Edit') },
                                    { id: '2', label: 'Duplicate', onClick: () => console.log('Duplicate') },
                                    { id: 'sep1', label: '', onClick: () => { }, type: 'separator' },
                                    { id: '3', label: 'Share', onClick: () => console.log('Share') },
                                ]}
                            />
                            <Button icon={faCheck} variant="primary" onClick={() => setShowGrowl(true)} aria-label="Save Changes" />
                        </div>
                    }
                />
            </div>

            {/* Bottom Tab Bar */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0 0 0 0',
                zIndex: 250,
            }}>
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

            <Sheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} position="absolute">
                <Toolbar
                    title="Edit Details"
                    style={{ background: 'transparent', backdropFilter: 'none' }}
                    leftElement={<Button variant="ghost" icon={faTimes} onClick={() => setIsSheetOpen(false)} aria-label="Close Sheet" />}
                    rightElement={<Button variant="primary" icon={faCheck} onClick={() => { setIsSheetOpen(false); setShowGrowl(true); }} aria-label="Save" />}
                />
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Button label="Take Photo" variant="secondary" fullWidth icon={faPlus} />
                        <Button label="Choose from Library" variant="secondary" fullWidth />
                        <Button label="Create Blank" variant="primary" fullWidth />
                    </div>
                </div>
            </Sheet>
        </div >
    );
};
