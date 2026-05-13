type NavbarProps = {
    title: string;
};
function Navbar({ title }: NavbarProps) {
    return (
        <nav>
            <h2>{title}</h2>
        </nav>
    );
}
    
export default Navbar;